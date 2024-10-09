interface UserAvatarProps {
  name: string;
}

export const UserAvatar = ({ name }: UserAvatarProps) => {
  const label = name ? name[0] : "";

  return (
    <div className="bg-slate-400 inline-block w-[25px] h-[25px] flex items-center justify-center rounded-full">
      <div className="uppercase font-bold text-white text-xs">{label}</div>
    </div>
  );
};
