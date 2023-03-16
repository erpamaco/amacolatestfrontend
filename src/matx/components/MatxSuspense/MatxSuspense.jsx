import React, { Suspense } from "react";
import { MatxLoading } from "matx";

const MatxSuspense = ({ children }) => {
  return <Suspense fallback={<MatxLoading />}>{children}</Suspense>;
};

export default MatxSuspense;
