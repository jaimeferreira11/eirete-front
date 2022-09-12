import {
  Avatar,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { FC } from 'react';

export interface IListItemGeneric {
  _id: string;
  title: string;
  subtitle: string;
  icon?: React.ReactNode;
  iconColor?: string;
}

interface Props {
  item: IListItemGeneric;
  onSelect: (_id: string) => void;
  children?: React.ReactNode;
  selected?: string;
}

export const ListItemGeneric: FC<Props> = ({
  item,
  selected = '',
  onSelect,
}) => {
  return (
    <ListItemButton
      sx={{
        width: '100%',
        borderRadius: 2,
        border: '1px solid #F3F3F3',
      }}
      selected={item._id === selected}
      onClick={() => onSelect(item._id)}
    >
      {item.icon && (
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: item.iconColor || null }}>{item.icon}</Avatar>
        </ListItemAvatar>
      )}
      <ListItemText
        primary={
          <>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body1"
              fontWeight={600}
              color="text.primary"
            >
              {item.title}
            </Typography>
          </>
        }
        secondary={
          <>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {item.subtitle}
            </Typography>
          </>
        }
      />
    </ListItemButton>
  );
};
