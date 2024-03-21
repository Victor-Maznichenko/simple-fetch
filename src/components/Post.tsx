const Post = ({ title, text }: { title: string; text: string }) => (
	<div className="post">
		<h4 className="post__title">{title}</h4>
		<p className="post_text">{text}</p>
	</div>
);

export default Post;
