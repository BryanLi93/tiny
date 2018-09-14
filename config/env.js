exports.isDev = () => {
  const nodeEnv = process.env.NODE_ENV || 'production';
  return nodeEnv === 'development';
}