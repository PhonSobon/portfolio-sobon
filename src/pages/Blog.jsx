import { useData } from "../context/DataContext";
import TagPill from "../components/shared/TagPill";

export default function Blog() {
  const { data } = useData();
  const { blogPosts } = data;

  if (blogPosts.length === 0) {
    return (
      <p className="text-sm text-gray-400 py-10 text-center">No posts yet.</p>
    );
  }

  return (
    <div>
      <div className="border-t border-border" />
      {blogPosts.map((post) => (
        <a
          key={post.id}
          href={post.url}
          target="_blank"
          rel="noreferrer"
          className="block py-5 border-b border-border group no-underline"
        >
          <div className="text-xs text-gray-400 mb-1 tracking-wide">{post.date}</div>
          <div className="font-garamond text-xl font-semibold leading-snug text-[#1a1a1a] mb-2 group-hover:text-accent transition-colors">
            {post.title}
          </div>
          <div className="text-sm text-gray-500 leading-relaxed mb-3">
            {post.excerpt}
          </div>
          <div>
            {post.tags?.map((t) => (
              <TagPill key={t} label={t} />
            ))}
          </div>
        </a>
      ))}
    </div>
  );
}
