import Header from "@components/text/Header";
import Subheader from "@components/text/Subheader";
import Input from "@components/interactive/Input";
import Flex from "@components/containers/Flex";
import Select from "@components/interactive/Select";

const selectOptions = [
  { value: "Status", text: "Status" },
  { value: "Alive", text: "Alive" },
  { value: "Dead", text: "Dead" },
  { value: "Unknown", text: "Unknown" },
];

export default function Home() {
  return (
    <>
      <Flex flexDirection="column" alignItems="center" justifyContent="center">
        <Header>Rick and Morty</Header>
        <Subheader>Character Search Tool</Subheader>
        <Input placeholder="Search for characters..." />
        <Select options={selectOptions} />
      </Flex>
    </>
  );
}
