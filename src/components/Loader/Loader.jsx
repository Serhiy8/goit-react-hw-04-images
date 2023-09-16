import { Grid } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <Grid
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="grid-loading"
      radius="12.5"
      wrapperStyle={{ justifyContent: 'center', padding: 20 }}
      wrapperClass=""
      visible={true}
    />
  );
};
