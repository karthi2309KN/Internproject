<template>
	<div class="content-wrapper">
		
		<section class="content-header">
			<div class="container-fluid">
				<div class="row mb-2">
					<div class="col-sm-6">
						<h1>List</h1>
					</div>
					<div class="col-sm-6">
						<ol class="breadcrumb float-sm-right">
							<li class="breadcrumb-item active">Home</li>
						</ol>
					</div>
				</div>
			</div>
		</section>
		<section class="content">
			
			<div class="card">
				<div class="card-header">
					<h3 class="card-title">
						<i class="ion ion-clipboard mr-1"></i>
						List
					</h3>
					<div class="card-tools" >
						<div type="button" class="btn btn-tool" title="post" @click="redirectTo()" >
							<i class="fas fa-plus"></i>
						</div>
						</div>
					
				</div>
				<div class="card-body p-0" >
					<table class="table table-striped projects">
						<thead>
						<tr>
							<th style="width:1%">Id</th>
							<th style="width:20%">Title</th>
							<th style="width:30%">Body</th>
							<th style="width:10%"></th>
						</tr>
						</thead>
						<tbody  v-for=" post in displayedPosts" :key="post.id">
						<td>{{post.id}}.</td>
						<td >{{post.title}}</td>
						<td>{{post.body.slice(0, 120)}}...</td>
						<td class="project-actions text-right">
							<router-link class="btn btn-info btn-sm" :to="'/update/'+post.id">
								<i class="fas fa-pencil-alt"></i> Edit
							</router-link>
							<a class="btn btn-danger btn-sm" @click="deletePost(post, index)in posts">
								<i class="fas fa-trash"></i> Delete
							</a></td>
						</tbody>
					</table>
				</div>
					<div class="overlay" v-if="loading">
							<i class=" fa fa-spinner fa-3x fa-spin"></i>
					</div>
			</div>
			<div class="clearfix btn-group col-md-2 offset-md-5">
				<button type="button" class="btn btn-sm btn-outline-secondary" v-if="page != 1" @click="page--"> &lt;&lt; </button>
				<button type="button" class="btn btn-sm btn-outline-secondary" v-for="pageNumber in pages.slice(page-1, page+5)" @click="page = pageNumber"> {{pageNumber}} </button>
				<button type="button" @click="page++" v-if="page < pages.length" class="btn btn-sm btn-outline-secondary"> &gt;&gt; </button>
			</div>
		</section>
	
	</div>
	
	<footer class="main-footer">
		<div class="float-right d-none d-sm-block">
			<b>Version</b> 3.2.0
		</div>
		<strong>Copyright &copy; 2014-2021 <a href="https://adminlte.io">AdminLTE.io</a>.</strong> All rights reserved.
	</footer>
	
	<aside class="control-sidebar control-sidebar-dark">
	
	</aside>
	

</template>


<script>
import axios from 'axios';
export default {
	name:"ItemsTodo",data() {
		return {
			isActive:false,
			id:null,
			userId:null,
			title:'',
			body:'',
			posts:[],
			baseUrl:'https://jsonplaceholder.typicode.com/posts/',
			page:1,
			perPage:10,
			pages:[],
				loading:false,
		};
	},methods:{
		redirectTo() {
			this.$router.push('/add')
		},toggle(){
			this.isActive= !this.isActive;
		},getPosts() {
				axios.get(this.baseUrl)
				.then(response => {
					this.posts=response.data;
				})
				.catch(response => {
					console.log(response);
				});
		},setPages() {
			let numberOfPages=Math.ceil(this.posts.length / this.perPage);
			for (let index=1; index <= numberOfPages; index++) {
				this.pages.push(index);
			}
		},paginate(posts) {
			let page=this.page;
			let perPage=this.perPage;
			let from=(page * perPage) - perPage;
			let to=(page * perPage);
			return posts.slice(from,to);
		},
		deletePost(posts,id){
				Swal.fire({
						title: 'Are you sure?',
						text: "You won't be able to revert this!",
						icon: 'warning',
						showCancelButton: true,
						confirmButtonColor: '#3085d6',
						cancelButtonColor: '#d33',
						confirmButtonText: 'Yes, delete it!'
				}).then((result) => {
			axios.delete(`https://jsonplaceholder.typicode.com/posts/`+this.id)
			.then(response => {
					this.loading = true;
					if (result.isConfirmed) {
						this.posts.splice(id,1);
						Swal.fire(
								'Deleted!',
								'Your file has been deleted.',
								'success'
						)
					}
					this.loading = false;
				})
			})
			.catch(response => {
					this.loading = false;
				console.log(response);
			});
		}
	},
	computed:{
		displayedPosts() {
			return this.paginate(this.posts);
		}
		
	},watch:{
		posts() {
			this.setPages();
		},
	},
	created () {
		this.getPosts();
	}
}
</script>

<style scoped>
button{
	margin-bottom: 0.5rem;
	margin-left: 0.5rem;
}
.clearfix{
	margin-top:0.5rem ;
}
.card-title{
	margin-top:0.5rem ;
}

</style>