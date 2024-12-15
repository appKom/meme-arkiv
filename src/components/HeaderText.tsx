const HeaderText = (props: { title: string }) => (
  <h1 className="py-4 text-center text-2xl md:text-4xl break-words font-bold">
    {props.title}
  </h1>
);

export default HeaderText;
