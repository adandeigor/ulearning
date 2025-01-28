import Image from "next/image";

interface Props {
  name: string;
  size: number;
}

const UserAvatar = ({ name, size }: Props) => {
  const letterColors = {
    'A': '72F44F',
    'B': '18C601',
    'C': 'A5E544',
    'D': 'E130D6',
    'E': 'F9EB88',
    'F': '12F3EC',
    'G': 'E45FD3',
    'H': 'A480DE',
    'I': '9EEE83',
    'J': '39A15D',
    'K': '021DA4',
    'L': '5C73E3',
    'M': '8F5A87',
    'N': '592863',
    'O': '94BC6C',
    'P': '314334',
    'Q': '7723EE',
    'R': 'BA449A',
    'S': '452A32',
    'T': '668B90',
    'U': '93BD66',
    'V': '174EA8',
    'W': '4D75A9',
    'X': 'C99D1A',
    'Y': '03351B',
    'Z': 'F125C7',
  };


  const generateAvatarUrl = (name: string) => {
    // On récupère seulement la première lettre du premier mot
    const firstLetter = name.split(" ")[0][0].toUpperCase();

    // Utilisation de la couleur associée à cette première lettre
    const backgroundColor = letterColors[firstLetter as keyof typeof letterColors] || "000000";
    const textColor = "FFFFFF";

    return `https://cloud.appwrite.io/v1/avatars/initials?name=${encodeURIComponent(
      name
    )}&background=${backgroundColor}&color=${textColor}`;
  };

  const avatarUrl = generateAvatarUrl(name);

  return (
    <Image
      src={avatarUrl}
      alt={`Avatar for ${name}`}
      width={size}
      height={size}
      style={{
        borderRadius: "50%",
      }}
    />
  );
};

export default UserAvatar;
