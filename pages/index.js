import React, { useContext, useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import client from "@apollo-client";
import Header from "@components/text/Header";
import Subheader from "@components/text/Subheader";
import Input from "@components/interactive/Input";
import Flex from "@components/containers/Flex";
import Select from "@components/interactive/Select";
import ClickableImage from "@components/media/ClickableImage";
import Body from "@components/text/Body";
import SearchListItem from "@components/containers/SearchListItem";
import Button from "@components/interactive/Button";
import LoadingIndicator from "@components/containers/LoadingIndicator";
import ScrollToTopButton from "@components/interactive/ScrollToTopButton";
import { LanguageContext } from "contexts";

const GET_CHARACTERS_BY_NAME_AND_STATUS = gql`
  query Character($characterName: String!, $status: String!, $page: Int!) {
    characters(page: $page, filter: { name: $characterName, status: $status }) {
      results {
        name
        status
        image
      }
      info {
        count
        pages
        next
      }
    }
  }
`;

export default function Home({ initialData }) {
  const { dictionary, setUserLanguage } = useContext(LanguageContext);

  const [queryResult, setQueryResult] = useState([]);
  const [paginationOptions, setPaginationOptions] = useState({});
  const [nameToSearch, setNameToSearch] = useState("");
  const [statusToSearch, setStatusToSearch] = useState("");
  const [page, setPage] = useState(1);

  const { loading, data } = useQuery(GET_CHARACTERS_BY_NAME_AND_STATUS, {
    variables: {
      characterName: nameToSearch,
      status: statusToSearch,
      page: page,
    },
    client: client,
  });

  const selectOptions = [
    { value: "", text: dictionary["status"] },
    { value: "Alive", text: dictionary["Alive"] },
    { value: "Dead", text: dictionary["Dead"] },
    { value: "unknown", text: dictionary["unknown"] },
  ];

  function handleNameChange(event) {
    setNameToSearch(event.target.value);
  }

  function handleStatusChange(event) {
    setStatusToSearch(event.target.value);
  }

  function handleButtonClick() {
    if (paginationOptions.next < paginationOptions.pages) {
      setPage(page + 1);
    }
  }

  function handleFlagClick(event) {
    setUserLanguage(event.target.getAttribute("value"));
  }

  useEffect(() => {
    setQueryResult(initialData.characters.results);
    setPaginationOptions(initialData.characters.info);
  }, [initialData]);

  useEffect(() => {
    if (loading) return;
    if (page > 1) {
      setQueryResult((queryResult) =>
        queryResult.concat(data?.characters.results)
      );
      setPaginationOptions(data?.characters.info);
    } else {
      setQueryResult(data?.characters.results);
      setPaginationOptions(data?.characters.info);
    }
  }, [page, data, loading]);

  useEffect(() => {
    setPage(1);
  }, [statusToSearch, nameToSearch]);

  return (
    <>
      {loading ? (
        <LoadingIndicator loadingDescription={dictionary["loading"]} />
      ) : null}
      <ScrollToTopButton>{dictionary["scrollToTop"]}</ScrollToTopButton>
      <Flex flexDirection="column" alignItems="center" justifyContent="center">
        <Header>Rick and Morty</Header>
        <Subheader>{dictionary["characterSearchTool"]}</Subheader>
        <Flex
          flexDirection="column"
          alignItems="center"
          padding="0px 0px 24px 0px"
        >
          <Body>{dictionary["language"]}</Body>
          <Flex padding="0" gap={16}>
            <ClickableImage
              src="/us-flag.svg"
              width={32}
              height={32}
              alt="US Flag. Click to change language to English."
              onClick={handleFlagClick}
              value="en"
            />
            <ClickableImage
              src="/spain-flag.svg"
              width={32}
              height={32}
              alt="Spanish Flag. Click to change language to Spanish."
              onClick={handleFlagClick}
              value="es"
            />
          </Flex>
        </Flex>
        <Input
          placeholder={dictionary["searchForCharacters"]}
          handleChange={handleNameChange}
        />
        <Select options={selectOptions} handleChange={handleStatusChange} />
        {queryResult?.length === 0 ? (
          <Body>{dictionary["noResultsFound"]}</Body>
        ) : (
          queryResult?.map((character, index) => {
            return (
              <SearchListItem
                key={`${character?.id}-${index}`}
                name={character?.name}
                status={dictionary[character?.status]}
                imageUrl={character?.image}
              />
            );
          })
        )}
        {paginationOptions?.next >= paginationOptions?.pages ||
        paginationOptions?.next === null ? null : (
          <Button handleButtonClick={handleButtonClick}>
            {dictionary["loadMoreCharacters"]}
          </Button>
        )}
      </Flex>
    </>
  );
}

export async function getServerSideProps() {
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
          info {
            count
            pages
            next
          }
        }
      }
    `,
  });

  return {
    props: {
      initialData: data,
    },
  };
}
