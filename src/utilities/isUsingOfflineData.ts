export const isUsingOfflineData = () => {
  return (process.env.NEXT_PUBLIC_OFFLINE_MODE)?.toLocaleLowerCase() === 'true';
}