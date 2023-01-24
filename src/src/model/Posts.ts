import { plainToInstance } from 'class-transformer';
import { derived, writable, type Writable } from 'svelte/store';
import Posts from 'src/data/Posts.json';

export class Post {
	title: string = "";
	subtitle: string = "";
	
	published: string = "";
	updated: string = "";

	imageSrc: string = "";
	imageAlt: string = "";
	primaryColor: string = "";

	link: string = "";
};

export const PostsWritableStore = writable(plainToInstance(Post, Posts));

export const PostSearchStore = writable('');

export const PostsFilteredStore = derived([PostSearchStore, PostsWritableStore], ([$postSearch, $postsWritable]) => {
    return postFilter($postsWritable, $postSearch);
});

function postFilter(posts: Post[], search: string) {
    var regex = new RegExp(search, "i");

    return posts.filter((post) => {
        return regex.test(post.title)
            || regex.test(post.subtitle)
    })
}