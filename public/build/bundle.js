
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
        else if (callback) {
            callback();
        }
    }

    function destroy_block(block, lookup) {
        block.d(1);
        lookup.delete(block.key);
    }
    function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
        let o = old_blocks.length;
        let n = list.length;
        let i = o;
        const old_indexes = {};
        while (i--)
            old_indexes[old_blocks[i].key] = i;
        const new_blocks = [];
        const new_lookup = new Map();
        const deltas = new Map();
        i = n;
        while (i--) {
            const child_ctx = get_context(ctx, list, i);
            const key = get_key(child_ctx);
            let block = lookup.get(key);
            if (!block) {
                block = create_each_block(key, child_ctx);
                block.c();
            }
            else if (dynamic) {
                block.p(child_ctx, dirty);
            }
            new_lookup.set(key, new_blocks[i] = block);
            if (key in old_indexes)
                deltas.set(key, Math.abs(i - old_indexes[key]));
        }
        const will_move = new Set();
        const did_move = new Set();
        function insert(block) {
            transition_in(block, 1);
            block.m(node, next);
            lookup.set(block.key, block);
            next = block.first;
            n--;
        }
        while (o && n) {
            const new_block = new_blocks[n - 1];
            const old_block = old_blocks[o - 1];
            const new_key = new_block.key;
            const old_key = old_block.key;
            if (new_block === old_block) {
                // do nothing
                next = new_block.first;
                o--;
                n--;
            }
            else if (!new_lookup.has(old_key)) {
                // remove old block
                destroy(old_block, lookup);
                o--;
            }
            else if (!lookup.has(new_key) || will_move.has(new_key)) {
                insert(new_block);
            }
            else if (did_move.has(old_key)) {
                o--;
            }
            else if (deltas.get(new_key) > deltas.get(old_key)) {
                did_move.add(new_key);
                insert(new_block);
            }
            else {
                will_move.add(old_key);
                o--;
            }
        }
        while (o--) {
            const old_block = old_blocks[o];
            if (!new_lookup.has(old_block.key))
                destroy(old_block, lookup);
        }
        while (n)
            insert(new_blocks[n - 1]);
        return new_blocks;
    }
    function validate_each_keys(ctx, list, get_context, get_key) {
        const keys = new Set();
        for (let i = 0; i < list.length; i++) {
            const key = get_key(get_context(ctx, list, i));
            if (keys.has(key)) {
                throw new Error('Cannot have duplicate keys in a keyed each');
            }
            keys.add(key);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.49.0' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src\components\Table.svelte generated by Svelte v3.49.0 */

    const file$2 = "src\\components\\Table.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	child_ctx[3] = i;
    	return child_ctx;
    }

    // (20:2) {#each teams as team, index (team.id)}
    function create_each_block(key_1, ctx) {
    	let tr;
    	let td0;
    	let t0_value = /*index*/ ctx[3] + 1 + "";
    	let t0;
    	let t1;
    	let td1;
    	let div;
    	let img;
    	let img_src_value;
    	let img_alt_value;
    	let t2;
    	let t3_value = /*team*/ ctx[1].name + "";
    	let t3;
    	let t4;
    	let td2;
    	let t5_value = /*team*/ ctx[1].points + "";
    	let t5;
    	let t6;
    	let td3;
    	let t7_value = /*team*/ ctx[1].matchesPlayed + "";
    	let t7;
    	let t8;
    	let td4;
    	let t9_value = /*team*/ ctx[1].wins + "";
    	let t9;
    	let t10;
    	let td5;
    	let t11_value = /*team*/ ctx[1].draws + "";
    	let t11;
    	let t12;
    	let td6;
    	let t13_value = /*team*/ ctx[1].losses + "";
    	let t13;
    	let t14;
    	let td7;
    	let t15_value = /*team*/ ctx[1].goals + "";
    	let t15;
    	let t16;
    	let td8;
    	let t17_value = /*team*/ ctx[1].counterGoals + "";
    	let t17;
    	let t18;
    	let td9;
    	let t19_value = /*team*/ ctx[1].goalDifference + "";
    	let t19;
    	let t20;
    	let td10;
    	let t21_value = /*team*/ ctx[1].percentage + "";
    	let t21;
    	let t22;

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			tr = element("tr");
    			td0 = element("td");
    			t0 = text(t0_value);
    			t1 = space();
    			td1 = element("td");
    			div = element("div");
    			img = element("img");
    			t2 = space();
    			t3 = text(t3_value);
    			t4 = space();
    			td2 = element("td");
    			t5 = text(t5_value);
    			t6 = space();
    			td3 = element("td");
    			t7 = text(t7_value);
    			t8 = space();
    			td4 = element("td");
    			t9 = text(t9_value);
    			t10 = space();
    			td5 = element("td");
    			t11 = text(t11_value);
    			t12 = space();
    			td6 = element("td");
    			t13 = text(t13_value);
    			t14 = space();
    			td7 = element("td");
    			t15 = text(t15_value);
    			t16 = space();
    			td8 = element("td");
    			t17 = text(t17_value);
    			t18 = space();
    			td9 = element("td");
    			t19 = text(t19_value);
    			t20 = space();
    			td10 = element("td");
    			t21 = text(t21_value);
    			t22 = space();
    			attr_dev(td0, "class", "svelte-1aoitg3");
    			add_location(td0, file$2, 21, 6, 360);
    			attr_dev(img, "class", "shield svelte-1aoitg3");
    			if (!src_url_equal(img.src, img_src_value = `/images/${/*team*/ ctx[1].shield}`)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", img_alt_value = /*team*/ ctx[1].name);
    			add_location(img, file$2, 25, 10, 430);
    			attr_dev(div, "class", "team svelte-1aoitg3");
    			add_location(div, file$2, 24, 8, 401);
    			attr_dev(td1, "class", "svelte-1aoitg3");
    			add_location(td1, file$2, 23, 6, 388);
    			attr_dev(td2, "class", "svelte-1aoitg3");
    			add_location(td2, file$2, 30, 6, 554);
    			attr_dev(td3, "class", "svelte-1aoitg3");
    			add_location(td3, file$2, 31, 6, 583);
    			attr_dev(td4, "class", "svelte-1aoitg3");
    			add_location(td4, file$2, 32, 6, 619);
    			attr_dev(td5, "class", "svelte-1aoitg3");
    			add_location(td5, file$2, 33, 6, 646);
    			attr_dev(td6, "class", "svelte-1aoitg3");
    			add_location(td6, file$2, 34, 6, 674);
    			attr_dev(td7, "class", "svelte-1aoitg3");
    			add_location(td7, file$2, 35, 6, 703);
    			attr_dev(td8, "class", "svelte-1aoitg3");
    			add_location(td8, file$2, 36, 6, 731);
    			attr_dev(td9, "class", "svelte-1aoitg3");
    			add_location(td9, file$2, 37, 6, 766);
    			attr_dev(td10, "class", "svelte-1aoitg3");
    			add_location(td10, file$2, 38, 6, 803);
    			attr_dev(tr, "class", "svelte-1aoitg3");
    			add_location(tr, file$2, 20, 4, 349);
    			this.first = tr;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, tr, anchor);
    			append_dev(tr, td0);
    			append_dev(td0, t0);
    			append_dev(tr, t1);
    			append_dev(tr, td1);
    			append_dev(td1, div);
    			append_dev(div, img);
    			append_dev(div, t2);
    			append_dev(div, t3);
    			append_dev(tr, t4);
    			append_dev(tr, td2);
    			append_dev(td2, t5);
    			append_dev(tr, t6);
    			append_dev(tr, td3);
    			append_dev(td3, t7);
    			append_dev(tr, t8);
    			append_dev(tr, td4);
    			append_dev(td4, t9);
    			append_dev(tr, t10);
    			append_dev(tr, td5);
    			append_dev(td5, t11);
    			append_dev(tr, t12);
    			append_dev(tr, td6);
    			append_dev(td6, t13);
    			append_dev(tr, t14);
    			append_dev(tr, td7);
    			append_dev(td7, t15);
    			append_dev(tr, t16);
    			append_dev(tr, td8);
    			append_dev(td8, t17);
    			append_dev(tr, t18);
    			append_dev(tr, td9);
    			append_dev(td9, t19);
    			append_dev(tr, t20);
    			append_dev(tr, td10);
    			append_dev(td10, t21);
    			append_dev(tr, t22);
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (dirty & /*teams*/ 1 && t0_value !== (t0_value = /*index*/ ctx[3] + 1 + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*teams*/ 1 && !src_url_equal(img.src, img_src_value = `/images/${/*team*/ ctx[1].shield}`)) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty & /*teams*/ 1 && img_alt_value !== (img_alt_value = /*team*/ ctx[1].name)) {
    				attr_dev(img, "alt", img_alt_value);
    			}

    			if (dirty & /*teams*/ 1 && t3_value !== (t3_value = /*team*/ ctx[1].name + "")) set_data_dev(t3, t3_value);
    			if (dirty & /*teams*/ 1 && t5_value !== (t5_value = /*team*/ ctx[1].points + "")) set_data_dev(t5, t5_value);
    			if (dirty & /*teams*/ 1 && t7_value !== (t7_value = /*team*/ ctx[1].matchesPlayed + "")) set_data_dev(t7, t7_value);
    			if (dirty & /*teams*/ 1 && t9_value !== (t9_value = /*team*/ ctx[1].wins + "")) set_data_dev(t9, t9_value);
    			if (dirty & /*teams*/ 1 && t11_value !== (t11_value = /*team*/ ctx[1].draws + "")) set_data_dev(t11, t11_value);
    			if (dirty & /*teams*/ 1 && t13_value !== (t13_value = /*team*/ ctx[1].losses + "")) set_data_dev(t13, t13_value);
    			if (dirty & /*teams*/ 1 && t15_value !== (t15_value = /*team*/ ctx[1].goals + "")) set_data_dev(t15, t15_value);
    			if (dirty & /*teams*/ 1 && t17_value !== (t17_value = /*team*/ ctx[1].counterGoals + "")) set_data_dev(t17, t17_value);
    			if (dirty & /*teams*/ 1 && t19_value !== (t19_value = /*team*/ ctx[1].goalDifference + "")) set_data_dev(t19, t19_value);
    			if (dirty & /*teams*/ 1 && t21_value !== (t21_value = /*team*/ ctx[1].percentage + "")) set_data_dev(t21, t21_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(tr);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(20:2) {#each teams as team, index (team.id)}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let table;
    	let thead;
    	let tr;
    	let th0;
    	let t1;
    	let th1;
    	let t3;
    	let th2;
    	let t5;
    	let th3;
    	let t7;
    	let th4;
    	let t9;
    	let th5;
    	let t11;
    	let th6;
    	let t13;
    	let th7;
    	let t15;
    	let th8;
    	let t17;
    	let th9;
    	let t19;
    	let th10;
    	let t21;
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let each_value = /*teams*/ ctx[0];
    	validate_each_argument(each_value);
    	const get_key = ctx => /*team*/ ctx[1].id;
    	validate_each_keys(ctx, each_value, get_each_context, get_key);

    	for (let i = 0; i < each_value.length; i += 1) {
    		let child_ctx = get_each_context(ctx, each_value, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
    	}

    	const block = {
    		c: function create() {
    			table = element("table");
    			thead = element("thead");
    			tr = element("tr");
    			th0 = element("th");
    			th0.textContent = "#";
    			t1 = space();
    			th1 = element("th");
    			th1.textContent = "Team";
    			t3 = space();
    			th2 = element("th");
    			th2.textContent = "Pts";
    			t5 = space();
    			th3 = element("th");
    			th3.textContent = "M";
    			t7 = space();
    			th4 = element("th");
    			th4.textContent = "W";
    			t9 = space();
    			th5 = element("th");
    			th5.textContent = "D";
    			t11 = space();
    			th6 = element("th");
    			th6.textContent = "L";
    			t13 = space();
    			th7 = element("th");
    			th7.textContent = "G";
    			t15 = space();
    			th8 = element("th");
    			th8.textContent = "CG";
    			t17 = space();
    			th9 = element("th");
    			th9.textContent = "DIF";
    			t19 = space();
    			th10 = element("th");
    			th10.textContent = "%";
    			t21 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(th0, "class", "svelte-1aoitg3");
    			add_location(th0, file$2, 6, 6, 81);
    			attr_dev(th1, "class", "team svelte-1aoitg3");
    			add_location(th1, file$2, 7, 6, 98);
    			attr_dev(th2, "class", "svelte-1aoitg3");
    			add_location(th2, file$2, 8, 6, 131);
    			attr_dev(th3, "class", "svelte-1aoitg3");
    			add_location(th3, file$2, 9, 6, 150);
    			attr_dev(th4, "class", "svelte-1aoitg3");
    			add_location(th4, file$2, 10, 6, 167);
    			attr_dev(th5, "class", "svelte-1aoitg3");
    			add_location(th5, file$2, 11, 6, 184);
    			attr_dev(th6, "class", "svelte-1aoitg3");
    			add_location(th6, file$2, 12, 6, 201);
    			attr_dev(th7, "class", "svelte-1aoitg3");
    			add_location(th7, file$2, 13, 6, 218);
    			attr_dev(th8, "class", "svelte-1aoitg3");
    			add_location(th8, file$2, 14, 6, 235);
    			attr_dev(th9, "class", "svelte-1aoitg3");
    			add_location(th9, file$2, 15, 6, 253);
    			attr_dev(th10, "class", "svelte-1aoitg3");
    			add_location(th10, file$2, 16, 6, 272);
    			attr_dev(tr, "class", "svelte-1aoitg3");
    			add_location(tr, file$2, 5, 4, 70);
    			attr_dev(thead, "class", "svelte-1aoitg3");
    			add_location(thead, file$2, 4, 2, 58);
    			attr_dev(table, "class", "svelte-1aoitg3");
    			add_location(table, file$2, 3, 0, 48);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, table, anchor);
    			append_dev(table, thead);
    			append_dev(thead, tr);
    			append_dev(tr, th0);
    			append_dev(tr, t1);
    			append_dev(tr, th1);
    			append_dev(tr, t3);
    			append_dev(tr, th2);
    			append_dev(tr, t5);
    			append_dev(tr, th3);
    			append_dev(tr, t7);
    			append_dev(tr, th4);
    			append_dev(tr, t9);
    			append_dev(tr, th5);
    			append_dev(tr, t11);
    			append_dev(tr, th6);
    			append_dev(tr, t13);
    			append_dev(tr, th7);
    			append_dev(tr, t15);
    			append_dev(tr, th8);
    			append_dev(tr, t17);
    			append_dev(tr, th9);
    			append_dev(tr, t19);
    			append_dev(tr, th10);
    			append_dev(table, t21);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(table, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*teams*/ 1) {
    				each_value = /*teams*/ ctx[0];
    				validate_each_argument(each_value);
    				validate_each_keys(ctx, each_value, get_each_context, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, table, destroy_block, create_each_block, null, get_each_context);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(table);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d();
    			}
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Table', slots, []);
    	let { teams } = $$props;
    	const writable_props = ['teams'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Table> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('teams' in $$props) $$invalidate(0, teams = $$props.teams);
    	};

    	$$self.$capture_state = () => ({ teams });

    	$$self.$inject_state = $$props => {
    		if ('teams' in $$props) $$invalidate(0, teams = $$props.teams);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [teams];
    }

    class Table extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { teams: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Table",
    			options,
    			id: create_fragment$2.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*teams*/ ctx[0] === undefined && !('teams' in props)) {
    			console.warn("<Table> was created without expected prop 'teams'");
    		}
    	}

    	get teams() {
    		throw new Error("<Table>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set teams(value) {
    		throw new Error("<Table>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\Header.svelte generated by Svelte v3.49.0 */

    const file$1 = "src\\components\\Header.svelte";

    function create_fragment$1(ctx) {
    	let header;
    	let nav;
    	let h1;

    	const block = {
    		c: function create() {
    			header = element("header");
    			nav = element("nav");
    			h1 = element("h1");
    			h1.textContent = "Championship";
    			attr_dev(h1, "class", "svelte-1cf6nhe");
    			add_location(h1, file$1, 3, 4, 22);
    			attr_dev(nav, "class", "svelte-1cf6nhe");
    			add_location(nav, file$1, 2, 2, 12);
    			add_location(header, file$1, 1, 0, 1);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, header, anchor);
    			append_dev(header, nav);
    			append_dev(nav, h1);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(header);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Header', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Header> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Header extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Header",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    const subscriber_queue = [];
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    const DUMMY = -1;
    // returns an array of round representations (array of player pairs).
    // http://en.wikipedia.org/wiki/Round-robin_tournament#Scheduling_algorithm
    var robin = function (n, ps) {  // n = num players
      const rs = [];                  // rs = round array
      if (!ps) {
        ps = [];
        for (let k = 1; k <= n; k += 1) {
          ps.push(k);
        }
      } else {
        ps = ps.slice();
      }

      if (n % 2 === 1) {
        ps.push(DUMMY); // so we can match algorithm for even numbers
        n += 1;
      }
      for (let j = 0; j < n - 1; j += 1) {
        rs[j] = []; // create inner match array for round j
        for (let i = 0; i < n / 2; i += 1) {
          const o = n - 1 - i;
          if (ps[i] !== DUMMY && ps[o] !== DUMMY) {
            // flip orders to ensure everyone gets roughly n/2 home matches
            const isHome = i === 0 && j % 2 === 1;
            // insert pair as a match - [ away, home ]
            rs[j].push([isHome ? ps[o] : ps[i], isHome ? ps[i] : ps[o]]);
          }
        }
        ps.splice(1, 0, ps.pop()); // permutate for next round
      }
      return rs;
    };

    function shuffle(array) {
        const newArray = array;
        let currentIndex = newArray.length;
        let randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [newArray[currentIndex], newArray[randomIndex]] = [newArray[randomIndex], newArray[currentIndex]];
        }
        return newArray;
    }

    class Championship {
        constructor(teams, homeAway) {
            this.matches = [];
            this.teams = teams;
            this.homeAway = homeAway;
        }
    }

    class Match {
        constructor(homeTeam, awayTeam, id) {
            this.score = { homeTeam: null, awayTeam: null };
            this.id = id;
            this.homeTeam = homeTeam;
            this.awayTeam = awayTeam;
        }
        play(homeGoals, awayGoals) {
            if (this.score.homeTeam === homeGoals && this.score.awayTeam === awayGoals)
                return;
            this.score = {
                homeTeam: homeGoals,
                awayTeam: awayGoals,
            };
            this.homeTeam.playMatch(this);
            this.awayTeam.playMatch(this);
        }
    }

    class RoundRobinTournament extends Championship {
        constructor(teams, homeAway) {
            super(teams, homeAway);
            this.rounds = this.createRounds();
            // console.log(JSON.stringify(this.rounds, null, 4));
        }
        createRounds() {
            let rounds = robin(this.teams.length, this.teams);
            if (this.homeAway) {
                rounds = this.generateSecondHalf(rounds);
            }
            return this.createMatches(rounds);
        }
        createMatches(rounds) {
            const roundsWithMatches = rounds.map((round) => {
                const shuffledRound = shuffle(round);
                const newRound = shuffledRound.map((match) => {
                    const homeTeam = match[0];
                    const visitingTeam = match[1];
                    const id = this.matches.length;
                    const newMatch = new Match(homeTeam, visitingTeam, id);
                    this.matches.push(newMatch);
                    return newMatch;
                });
                return newRound;
            });
            return roundsWithMatches;
        }
        generateSecondHalf(firstHalf) {
            const secondHalf = robin(this.teams.length, this.teams);
            secondHalf.forEach((round) => {
                round.forEach((match) => {
                    match.reverse();
                });
            });
            return [...firstHalf, ...secondHalf];
        }
        sortTeams() {
            this.teams.sort(RoundRobinTournament.compareTable);
        }
        static compareTable(team1, team2) {
            if (team1.points < team2.points)
                return 1; // 1 changes the position
            if (team1.points > team2.points)
                return -1; // -1 still the same
            if (team1.wins < team2.wins)
                return 1;
            if (team1.wins > team2.wins)
                return -1;
            if (team1.goalDifference < team2.goalDifference)
                return 1;
            if (team1.goalDifference > team2.goalDifference)
                return -1;
            if (team1.goals < team2.goals)
                return 1;
            if (team1.goals > team2.goals)
                return -1;
            if (team1.name < team2.name)
                return -1;
            if (team1.name > team2.name)
                return 1;
            return 0;
        }
    }

    class Team {
        constructor(name, shield, id) {
            this.matchesPlayedList = {};
            this.name = name;
            this.shield = shield;
            this.id = id;
        }
    }

    class RoundRobinTeam extends Team {
        constructor() {
            super(...arguments);
            this.wins = 0;
            this.draws = 0;
            this.losses = 0;
            this.goals = 0;
            this.counterGoals = 0;
        }
        get points() {
            return this.wins * 3 + this.draws;
        }
        get goalDifference() {
            return this.goals - this.counterGoals;
        }
        get matchesPlayed() {
            return Object.keys(this.matchesPlayedList).length;
        }
        get percentage() {
            if (this.points === 0)
                return 0;
            return (this.points * 100) / (this.matchesPlayed * 3);
        }
        playMatch(match) {
            if (!match.score.homeTeam || !match.score.awayTeam) {
                delete this.matchesPlayedList[match.id];
            }
            else {
                this.matchesPlayedList[match.id] = match;
            }
            this.updateInfo();
        }
        updateInfo() {
            this.resetValues();
            const matchesPlayedArray = Object.values(this.matchesPlayedList);
            matchesPlayedArray.forEach((match) => {
                const { score, homeTeam } = match;
                const selfScore = homeTeam.name === this.name
                    ? score.homeTeam
                    : score.awayTeam;
                const otherScore = homeTeam.name === this.name
                    ? score.awayTeam
                    : score.homeTeam;
                this.goals += selfScore;
                this.counterGoals += otherScore;
                if (selfScore > otherScore) {
                    this.wins += 1;
                }
                else if (otherScore > selfScore) {
                    this.losses += 1;
                }
                else {
                    this.draws += 1;
                }
            });
        }
        resetValues() {
            this.goals = 0;
            this.counterGoals = 0;
            this.wins = 0;
            this.draws = 0;
            this.losses = 0;
        }
    }

    const teams = [
        new RoundRobinTeam('Vasco', 'vasco.png', 1),
        new RoundRobinTeam('Flamengo', 'flamengo.png', 2),
        new RoundRobinTeam('Botafogo', 'botafogo.png', 3),
        new RoundRobinTeam('Fluminense', 'fluminense.png', 4),
    ];
    var initialState = new RoundRobinTournament(teams, true);

    const roundrobin = writable(initialState);

    /* src\App.svelte generated by Svelte v3.49.0 */
    const file = "src\\App.svelte";

    function create_fragment(ctx) {
    	let header;
    	let t;
    	let main;
    	let table;
    	let current;
    	header = new Header({ $$inline: true });

    	table = new Table({
    			props: { teams: /*$roundrobin*/ ctx[0].teams },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(header.$$.fragment);
    			t = space();
    			main = element("main");
    			create_component(table.$$.fragment);
    			add_location(main, file, 7, 0, 185);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(header, target, anchor);
    			insert_dev(target, t, anchor);
    			insert_dev(target, main, anchor);
    			mount_component(table, main, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const table_changes = {};
    			if (dirty & /*$roundrobin*/ 1) table_changes.teams = /*$roundrobin*/ ctx[0].teams;
    			table.$set(table_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(header.$$.fragment, local);
    			transition_in(table.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(header.$$.fragment, local);
    			transition_out(table.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(header, detaching);
    			if (detaching) detach_dev(t);
    			if (detaching) detach_dev(main);
    			destroy_component(table);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let $roundrobin;
    	validate_store(roundrobin, 'roundrobin');
    	component_subscribe($$self, roundrobin, $$value => $$invalidate(0, $roundrobin = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Table, Header, roundrobin, $roundrobin });
    	return [$roundrobin];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
        target: document.body,
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
