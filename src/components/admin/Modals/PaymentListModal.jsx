import {
  Box,
  Chip,
  IconButton,
  Modal,
  Stack,
  Table,
  TableBody,
  TableContainer,
  Typography,
  styled,
} from "@mui/material";
import CloseIcon from "components/icons/CloseIcon";
import React from "react";
import StyledSearch from "../StyledInputs/StyledSearch";
import { useDispatch, useSelector } from "react-redux";
import SearchLoader from "../Loaders/SerarchLoader";
import AdminTableHeader from "components/general/TableHead/Admin";
import CategoriesRow from "../TableRows/CategoriesRow";
import heading from "constants/adminCategoriesHeading";
import { searchPaymentList } from "redux-store/admin/payment/payment.slice";
import PaymentRow from "../TableRows/PaymentRow";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const StyledIconBtn = styled(IconButton)(({ theme }) => ({
  padding: "10px",
  borderRadius: "50%",
  background: theme.palette.background[200],
  width: "35px",
  height: "35px",
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "98%", sm: 400, lg: 750 },
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "20px",
  outline: "none",
  minHeight: 150,
  paddingBottom: 5,
};

const SearchPayment = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useTranslation("translation");

  const token = useSelector((state) => state.auth.token);
  const isLoading = useSelector((state) => state.payment.isSearchLoading);
  const list = useSelector((state) => state.payment.searchList);
  const curLimit = router?.query?.limit;

  const [page, setPage] = React.useState(1);
  const [filterValue, setFilter] = React.useState("");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSearch = (e) => {
    setFilter(e?.target?.value);
    dispatch(
      searchPaymentList({
        token,
        params: { limit: 7, page: page, filter: filterValue },
      })
    );
  };

  React.useEffect(() => {
    handleSearch();
  }, [curLimit]);

  return (
    <main>
      <StyledSearch
        onClick={handleOpen}
        placeholder={t("SearchPayment") + "..."}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            py={1}
            px={2}
          >
            <Typography variant="h6" color="secondary.100">
              {t("SearchPayment")}
            </Typography>
            <StyledIconBtn onClick={handleClose}>
              <CloseIcon />
            </StyledIconBtn>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            py={1.5}
            px={{ xs: 1, sm: 2, lg: 6 }}
            bgcolor="background.gray"
          >
            <StyledSearch
              onChange={handleSearch}
              value={filterValue}
              placeholder={t("SearchPayment") + "..."}
              sx={{ width: "100%" }}
            />
          </Stack>

          {isLoading ? (
            <Stack py={4}>
              <SearchLoader />
            </Stack>
          ) : (
            list?.length && (
              <TableContainer>
                <Table arial-label="simple table">
                  <AdminTableHeader heading={heading} hideSelectBtn />
                  <TableBody>
                    {list.map((item, key) => (
                      <PaymentRow key={item._id} {...item} index={key} />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )
          )}
        </Box>
      </Modal>
    </main>
  );
};

export default SearchPayment;
