type ApiLifecycleProps = {
  access: string
};

export const ApiLifecycle: FunctionComponent<ApiLifecycleProps> = ({
  access
}: ApiLifecycleProps) => (
  <span class="api-label api-label-ie">
    Identity Engine
  </span>
);

export default Message;