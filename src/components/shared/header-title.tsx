import * as React from "react";
import { useAppDispatch, useAppSelector } from "@hooks/redux-hooks";
import {
    updateHeaderTitle,
    showBackButton,
    hideBackButton
} from "store/action";

type HeaderTitleControlProps = {
  title: string;
  showBackButon?: boolean;
  backUrl?: string;
};

/**
 *
 This component is used to control the header component. Since the header is meant to be customized per page, the aim
 of this component is to provide customize the header based on the page the user is on.
 */
const HeaderTitle = (
  { title, showBackButon, backUrl }: HeaderTitleControlProps,
) => {
  const { headerTitle } = useAppSelector((store) => store.headerControls);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (headerTitle !== title) {
      dispatch(updateHeaderTitle(title));
    }

    if (showBackButon) {
      dispatch(showBackButton(backUrl));
    } else {
      dispatch(hideBackButton());
    }
  }, [title, dispatch, headerTitle, showBackButon, backUrl]);

  return null;
};

export default HeaderTitle;
