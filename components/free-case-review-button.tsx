import * as React from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { BorderBeam } from "./ui/border-beam";

type FreeCaseReviewProps = ButtonProps & {
  iconSize?: number;
  iconStrokeWidth?: number;
};

const FreeCaseReview = React.forwardRef<
  HTMLButtonElement,
  FreeCaseReviewProps
>((props, ref) => {
  const {
    className,
    size = "lg",
    children = "Free Case Review",
    iconSize = 16,
    iconStrokeWidth = 2,
    ...restProps
  } = props;

  return (
    <Button
      ref={ref}
      size={size}
      variant="default"
      className={cn("group relative overflow-hidden", className)}
      {...restProps}
    >
      <BorderBeam colorFrom="blue" colorTo="blue-500" />
      <span className="mr-8 text-white transition-opacity duration-300 group-hover:opacity-0">
        {children}
      </span>
      <span
        className="absolute right-1 rounded-full top-1 bottom-1 z-10 flex items-center justify-center w-1/4 transition-all duration-300 bg-primary-foreground/15 group-hover:w-[calc(100%-0.5rem)] group-active:scale-95"
        aria-hidden="true"
      >
        <ChevronRight size={iconSize} strokeWidth={iconStrokeWidth} />
      </span>
    </Button>
  );
});

FreeCaseReview.displayName = "FreeCaseReview";

export default FreeCaseReview;
