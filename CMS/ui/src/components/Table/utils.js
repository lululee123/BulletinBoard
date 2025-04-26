import { DEFAULT_PAGE } from "@@constants";

export const usePagination = ({ page, total, limit, onChange }) => {
  const totalPages = Math.ceil(total / limit) || DEFAULT_PAGE;
  const isPrevPageDisabled = page <= DEFAULT_PAGE;
  const isNextPageDisabled = page >= totalPages;

  const handleOnChange = ({ limit: nextLimit, page: nextPage }) => {
    const newPage = Math.max(DEFAULT_PAGE, Math.min(totalPages, nextPage));
    onChange({ limit: nextLimit, page: newPage });
  };

  return {
    totalPages,
    isPrevPageDisabled,
    isNextPageDisabled,
    handleOnChange,
  };
};
