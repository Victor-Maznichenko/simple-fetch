import { useEffect, useState } from "react";

import Post from "./Post";
import { simpleFetch } from "../utils/api";

interface IPost {
	id: number;
	title: string;
	body: string;
}

const App = () => {
	const [posts, setPosts] = useState<Array<IPost>>([]);

	useEffect(() => {
		simpleFetch
			.get("posts?_limit=10")
			.then((responseData) => setPosts(responseData ?? []))
			.catch((error) => console.error(error));
	}, []);

	return (
		<main>
			<div className="posts">
				{posts.map(({ id, title, body }) => (
					<Post key={id} title={title} text={body} />
				))}
			</div>
		</main>
	);
};

export default App;
