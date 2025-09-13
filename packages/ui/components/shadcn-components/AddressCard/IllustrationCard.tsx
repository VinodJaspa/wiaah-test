// components/IllustrationCard.tsx
export default function IllustrationCard({ imageSrc }: { imageSrc: string }) {
    return (
      <div className="rounded-md overflow-hidden shadow-sm">
        <img src={imageSrc} alt="House" className="w-full object-cover" />
      </div>
    );
  }
  