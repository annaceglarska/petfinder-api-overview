import { Card, CardContent, Skeleton } from "@mui/material";
import React from "react";

const CardSkeleton: React.FC = () => {
  return (
    <Card sx={{ height: "100%", position: "relative" }}>
      <Skeleton animation="wave" variant="rectangular" sx={{ height: 150 }} />
      <CardContent sx={{ marginBottom: "20px" }}>
        <Skeleton
          animation="wave"
          variant="rectangular"
          sx={{ width: "60%", marginBottom: "10px" }}
        />
        <Skeleton animation="wave" variant="rectangular" sx={{ height: 80 }} />
      </CardContent>

      <Skeleton
        animation="wave"
        variant="rectangular"
        sx={{ width: "50%", margin: "0px 0px 20px 20px" }}
      />
    </Card>
  );
};

export default CardSkeleton;
