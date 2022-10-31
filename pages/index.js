import Header from "@components/text/Header";
import Subheader from "@components/text/Subheader";
import Input from "@components/interactive/Input";
import Flex from "@components/containers/Flex";
import Select from "@components/interactive/Select";
import ClickableImage from "@components/media/ClickableImage";
import Body from "@components/text/Body";
import SearchListItem from "@components/containers/SearchListItem";
import Button from "@components/interactive/Button";
import { gql } from "@apollo/client";
import client from "@apollo-client";

const selectOptions = [
  { value: "Status", text: "Status" },
  { value: "Alive", text: "Alive" },
  { value: "Dead", text: "Dead" },
  { value: "Unknown", text: "Unknown" },
];

export default function Home({ initialData }) {
  console.log(initialData);

  return (
    <>
      <Flex flexDirection="column" alignItems="center" justifyContent="center">
        <Header>Rick and Morty</Header>
        <Subheader>Character Search Tool</Subheader>
        <Flex
          flexDirection="column"
          alignItems="center"
          padding="0px 0px 24px 0px"
        >
          <Body>Language:</Body>
          <Flex padding="0" gap={16}>
            <ClickableImage
              src="/us-flag.svg"
              width={32}
              height={32}
              alt="US Flag. Click to change language to English."
            />
            <ClickableImage
              src="/spain-flag.svg"
              width={32}
              height={32}
              alt="Spanish Flag. Click to change language to Spanish."
            />
          </Flex>
        </Flex>
        <Input placeholder="Search for characters..." />
        <Select options={selectOptions} />
        {initialData.map((character) => (
          <SearchListItem
            key={character.id}
            name={character.name}
            status={character.status}
            imageUrl={character.image}
          />
        ))}
        <Button>Load more characters...</Button>
      </Flex>
    </>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query {
        characters(page: 1) {
          results {
            id
            name
            status
            image
          }
        }
      }
    `,
  });

  return {
    props: {
      initialData: data.characters.results,
    },
  };
}
