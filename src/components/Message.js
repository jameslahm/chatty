/**@jsx jsx */
import { jsx, css } from "@emotion/core";

function Message({ message }) {
  return (
    <div
      css={css`
        display: flex;
      `}
    >
      {message.content}
    </div>
  );
}
export default Message;
