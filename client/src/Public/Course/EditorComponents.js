import React from 'react';
import { cx, css } from '@emotion/css';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import CodeIcon from '@mui/icons-material/Code';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';

export const Button = React.forwardRef(
    (
      {
        className,
        active,
        reversed,
        ...props
      },
      ref
    ) => (
      <span
        {...props}
        ref={ref}
        className={cx(
          className,
          css`
            cursor: pointer;
            color: ${reversed
              ? active
                ? 'white'
                : '#aaa'
              : active
              ? 'black'
              : '#ccc'};
          `
        )}
      />
    )
)

export const Menu = React.forwardRef(
  (
    { className, ...props },
    ref
  ) => (
    <div
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          & > * {
            display: inline-block;
          }
          & > * + * {
            margin-left: 15px;
          }
        `
      )}
    />
  )
)

export const Icon = React.forwardRef(
  (
    { className, ...props },
    ref
) => {
  switch(props.children) {
    case "format_bold":
      return <FormatBoldIcon />
    case "format_italic":
      return <FormatItalicIcon />
    case "format_underlined":
      return <FormatUnderlinedIcon />
    case "code":
      return <CodeIcon />
    case "looks_one":
      return <LooksOneIcon />
    case "looks_two":
      return <LooksTwoIcon />
    case "format_quote":
      return <FormatQuoteIcon />
    case "format_list_numbered":
      return <FormatListNumberedIcon />
    case "format_list_bulleted":
      return <FormatListBulletedIcon />
    case "delete":
      return <DeleteIcon />
    case "image":
      return <ImageIcon />
    default:
      return <FormatBoldIcon />
  }
}
)

export const Toolbar = React.forwardRef(
  (
    { className, ...props },
    ref
  ) => (
    <Menu
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          position: relative;
          padding: 10px 18px 10px;
          margin: 0;
          border-bottom: 2px solid #eee;
          margin-bottom: 20px;
        `
      )}
    />
  )
)