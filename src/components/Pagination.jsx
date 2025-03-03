import { Pagination as MuiPagination, Stack } from '@mui/material';

export default function Pagination({ count, page, onChange }) {
  return (
    <Stack spacing={2} sx={{ mt: 4, alignItems: 'center' }}>
      <MuiPagination
        count={count}
        page={page}
        onChange={onChange}
        color="primary"
        showFirstButton
        showLastButton
        sx={{
          '& .MuiPaginationItem-root': {
            fontSize: '1rem',
            '&.Mui-selected': {
              fontWeight: 600
            }
          }
        }}
      />
    </Stack>
  );
} 