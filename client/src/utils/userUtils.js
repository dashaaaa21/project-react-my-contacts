export const getUserFirstLetterForAvatar = (userInformation) => {
  return (userInformation.name || 'U').charAt(0).toUpperCase();
};

export const getUserNameForGreeting = (userInformation) => {
  return userInformation.name || 'User';
};
