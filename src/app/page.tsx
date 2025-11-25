import Header from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { ForumCard } from "@/components/ForumCard";

const forums = [
  {
    title: "product-development-stuff",
    creator: "Lara Alves",
    people: 48,
    description:
      "O que temos de bom nessa sala, pessoal? Bora falar de programação, criação de coisas legais e projetos pessoais e desafios que queiram compartilhar.",
    size: "lg",
    highlight: true,
  },
  {
    title: "gente-maneira-discutindo-tema-maneiro",
    creator: "Um Nome",
    people: 70,
    description: "Discussões gerais sobre tecnologia e ideias legais.",
    size: "md",
  },
  {
    title: "Thinking about...",
    creator: "Um Nome",
    people: 70,
    description: "Reflexões e pensamentos soltos sobre tech.",
    size: "sm",
  },
  {
    title: "#segurança",
    creator: "Um Nome",
    people: 70,
    description: "Vamos debater segurança da informação?",
    size: "sm",
  },
  {
    title: "Designers na Firma",
    creator: "Lucas Gomes",
    people: 55,
    description:
      "Sala dedicada para designers discutirem projetos, ideias e tendências.",
    size: "lg",
    highlight: true,
  },
];

export default function HomePage() {
  return (
    <main className="">
      <h1 className="text-3xl font-bold mt-10">Opa!</h1>
      <p className="text-gray-600 mt-1">Sobre o que gostaria de falar hoje?</p>

      <SearchBar />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-10 auto-rows-min">
        {forums.map((forum, idx) => (
          <ForumCard key={idx} {...forum} />
        ))}
      </div>
    </main>
  );
}
