function Card({ title, value }) {
  return (
    <div className="rounded bg-white p-4 shadow dark:bg-gray-800 dark:text-white">
      <h2 className="text-gray-500 dark:text-gray-300">{title}</h2>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}

export default Card;
