import SocialCards, { CardItem } from "@/components/ui/card-fan-carousel";

const DEMO_CARDS: CardItem[] = [
  { imgUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop", alt: "Mountain landscape" },
  { imgUrl: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=800&auto=format&fit=crop", alt: "City night" },
  { imgUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=800&auto=format&fit=crop", alt: "Foggy forest" },
  { imgUrl: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=800&auto=format&fit=crop", alt: "Sunlit woods" },
  { imgUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop", alt: "Tropical beach" },
  { imgUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop", alt: "Starry mountain" },
  { imgUrl: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?q=80&w=800&auto=format&fit=crop", alt: "Golden sunset" },
  { imgUrl: "https://images.unsplash.com/photo-1439853941329-a99ce0457e8a?q=80&w=800&auto=format&fit=crop", alt: "Lake reflection" },
  { imgUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop", alt: "Green valley" },
  { imgUrl: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800&auto=format&fit=crop", alt: "Sunbeam nature" },
];

export default function Demo() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <SocialCards cards={DEMO_CARDS} />
    </div>
  );
}
