import { useTimeDuration } from "ui";

export interface DurationDisplayProps {
  duration: number;
}

export const DurationDisplay: React.FC<DurationDisplayProps> = ({
  duration,
}) => {
  const {
    hours: h,
    minutes: m,
    seconds: s,
  } = useTimeDuration(Math.floor(duration));

  const hours = h < 10 ? `0${h}` : h;
  const minutes = m < 10 ? `0${m}` : m;
  const seconds = s < 10 ? `0${s}` : s;
  return <>{`${minutes}:${seconds}`}</>;
};
