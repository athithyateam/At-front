import { Link } from "react-router-dom";

const BlogCard = ({ image, title, readTime, to }) => {
  if (!to) {
    console.warn("BlogCard missing `to` prop:", title);
  }

  return (
    <Link
      to={to}
      className="block w-72 shrink-0 group cursor-pointer"
    >
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
        <img
          src={image}
          alt={title}
          className="h-40 w-full object-cover"
        />

        <div className="p-4">
          <h3 className="font-semibold text-gray-800 group-hover:text-[#C59A2F] transition line-clamp-2">
            {title}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {readTime}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
