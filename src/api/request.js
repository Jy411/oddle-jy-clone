import { request } from '@octokit/request';

// console.log("request", localStorage.getItem("token"));

export default request.defaults({
	headers: {
		authorization: `token ${localStorage.getItem('token')}`,
	},
	per_page: 12,
});
