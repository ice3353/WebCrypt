import './global.css';

import App from './App.svelte';
import { mount } from "svelte";

export default mount(App, { 
	target: document.body
});
