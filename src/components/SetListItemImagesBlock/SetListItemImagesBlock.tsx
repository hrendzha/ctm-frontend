import { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  IconButton,
  Tooltip,
  Divider,
  Box,
  TextField,
  InputAdornment,
  Skeleton,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useImages } from "hooks/useImages";
import { IImageItem } from "interfaces";

interface IProps {
  searchValue?: string;
  onSetImageClick: (imageModel: IImageItem) => void;
}

interface FormData {
  search: string;
}

const imagesPerPage = 12;
const emptyArray = Array(imagesPerPage).fill(null);

const SetListItemImagesBlock = ({ searchValue = "", onSetImageClick }: IProps) => {
  const [searchQuery, setSearchQuery] = useState(searchValue);
  const [pageNum, setPageNum] = useState(1);
  const { isLoading, images, hasNextPage } = useImages(pageNum, searchQuery);
  const intersectionObserver = useRef<IntersectionObserver>();
  const imagesListRef = useRef<HTMLUListElement>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      search: searchValue,
    },
    mode: "onChange",
  });

  const onSubmit = async (formData: FormData) => {
    const searchValue = formData.search.trim();
    if (searchValue.length < 1) return;

    if (imagesListRef.current) {
      imagesListRef.current.scrollLeft = 0;
    }
    setPageNum(1);
    setSearchQuery(searchValue);
  };

  const lastImageRef = useCallback(
    (el: HTMLElement) => {
      if (isLoading) return;

      if (intersectionObserver.current) intersectionObserver.current.disconnect();

      const intersectionObserverOptions = {
        root: imagesListRef.current,
      };

      intersectionObserver.current = new IntersectionObserver(images => {
        if (images[0].isIntersecting && hasNextPage) {
          setPageNum(prev => prev + 1);
        }
      }, intersectionObserverOptions);

      if (el) intersectionObserver.current.observe(el);
    },
    [isLoading, hasNextPage]
  );

  const shouldShowNotFoundText = images.length < 1 && !isLoading;

  return (
    <>
      <Divider />

      <Box
        sx={{
          p: 1,
        }}
      >
        <Box
          sx={{
            mb: 1,
          }}
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            autoFocus
            fullWidth
            label="Search images"
            margin="normal"
            error={Boolean(errors.search)}
            helperText={errors.search?.message || ""}
            {...register("search")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="Search">
                    <IconButton
                      type="submit"
                      aria-label="search images"
                      edge="end"
                      disabled={isLoading}
                    >
                      <SearchIcon />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box
          component="ul"
          sx={{
            display: "flex",
            alignItems: "center",
            overflowX: "auto",
            mb: 1,
          }}
          ref={imagesListRef}
        >
          {shouldShowNotFoundText && (
            <Box
              component="li"
              sx={{
                width: "100%",
              }}
            >
              <Typography variant="h6" component="p" align="center" lineHeight="156px">
                No images found
              </Typography>
            </Box>
          )}

          {isLoading && pageNum === 1
            ? emptyArray.map((_, idx) => (
                <Skeleton
                  key={idx}
                  sx={{
                    flexShrink: 0,
                    "&:not(:last-child)": {
                      marginRight: 1,
                    },
                  }}
                  component="li"
                  variant="rectangular"
                  width={220}
                  height={156}
                />
              ))
            : images.map((image, idx) => (
                <Box
                  component="li"
                  sx={{
                    "&:not(:last-child)": {
                      marginRight: 1,
                    },
                  }}
                  key={idx}
                  {...(images.length === idx + 1 ? { ref: lastImageRef } : null)}
                >
                  <Button onClick={() => onSetImageClick(image)}>
                    <img
                      style={{
                        display: "inline-block",
                        objectFit: "contain",
                      }}
                      src={image.url}
                      alt={image.desc}
                      width="220"
                      height="150"
                      loading="lazy"
                    />
                  </Button>
                </Box>
              ))}

          {isLoading && pageNum > 1 && (
            <Box
              component="li"
              sx={{
                minWidth: "50px",
              }}
            >
              <CircularProgress />
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export { SetListItemImagesBlock };
