import { Stack, Autocomplete, TextField } from '@mui/material'
import { useStyles } from './styles'
import { ISingleAsset } from '../../common/types/assets'
import { useAppSelector } from '../../utils/hook'

const SearchBarComponent = () => {
  const assetsArray: ISingleAsset[] = useAppSelector(
    (state) => state.assets.assets
  )
  const classes = useStyles()
  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete
        freeSolo
        renderInput={(element) => (
          <TextField
            {...element}
            label="Search"
            InputProps={{
              ...element.InputProps,
              type: 'search',
            }}
          />
        )}
        options={assetsArray.map((element: { name: string }) => element.name)}
      />
    </Stack>
  )
}

export default SearchBarComponent
