function stringToColor(string: string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }

  return color;
}

function getAvatarByName(name: string) {
  if (!name) return;

  const firstLetter = name.split(" ")[0][0];
  const isSecondWordExist = name.split(" ")[1];
  const secondLetter = isSecondWordExist ? name.split(" ")[1][0] : "";

  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${firstLetter.toUpperCase()}${secondLetter.toUpperCase()}`,
  };
}

export { getAvatarByName };
