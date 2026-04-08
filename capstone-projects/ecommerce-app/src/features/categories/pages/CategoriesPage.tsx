import { useFetch } from "@/hooks/useFetch";

function CategoriesPage() {
  const { data, loading, error } = useFetch<any[]>(
    "https://api.escuelajs.co/api/v1/categories",
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {data?.map((cat) => (
        <p key={cat.id}>{cat.name}</p>
      ))}
    </div>
  );
}

export default CategoriesPage;
