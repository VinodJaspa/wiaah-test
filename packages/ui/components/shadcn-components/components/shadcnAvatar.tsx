import { cn } from "../lib/utils";

interface ShadcnAvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

export function ShadcnAvatar({ src, alt, className, ...props }: ShadcnAvatarProps) {
  return <img src={src} alt={alt} className={cn("w-10 h-10 rounded-full border border-gray-300", className)} {...props} />;
}
