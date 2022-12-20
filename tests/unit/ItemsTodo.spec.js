// import {mount} from '@vue/test-utils'
// import {createRouter, createWebHistory } from  'vue-router'
//
// import ItemsTodo from "@/components/ItemsTodo.vue";
// import AddTodo from "@/pages/AddTodo.vue";
//
// describe('ItemsTodo',()=>{
// 	it('renders a component via routing', ()=>{
// 		const router = createRouter({
// 			history: createWebHistory(),
// 			routes :[{
// 				path: '/add',
// 				name:'add',
// 				components: AddTodo
// 			}]
// 		})
// 		router.push('/add')
// 		const wrapper = mount(ItemsTodo)
//
// 		expect(wrapper.findComponent(AddTodo).exists()).toBe(true)
// 	})
// })