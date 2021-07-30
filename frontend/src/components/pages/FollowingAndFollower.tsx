import { memo, useEffect, VFC } from "react";
import { Stack, Link, Tabs, TabPanels, TabPanel, TabList, Tab } from "@chakra-ui/react";
import { useHistory, useParams } from "react-router-dom";
import { useUser } from "../../hooks/useUser";


type Props = {
  defaultIndex: number | undefined;
};

export const FollowingAndFollower: VFC<Props> = memo(props => {
  const { defaultIndex } = props;
  const { id } = useParams<{ id: string }>(); //URLパラメーターを受け取る();
  const { getFollowingOrFllowers, following, followers } = useUser();
  const history = useHistory();
  
  useEffect(() => getFollowingOrFllowers(id, defaultIndex),[])

  const onChangeTab = (index: number) => {
    index === 0 ?
      history.push(`/following/${id}`)
    :
      history.push(`/followers/${id}`);
  };

  return (
    <>
    <Tabs onChange={onChangeTab} defaultIndex={defaultIndex}>
      <TabList>
        <Tab>フォロー中</Tab>
        <Tab>フォロワー</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Stack spacing={4}>
            {following.map((following) => (
              <Link key={following.id}>{following.name}</Link>
            ))}
          </Stack>
        </TabPanel>
        <TabPanel>
          <Stack spacing={4}>
            {followers.map((follower) => (
              <Link key={follower.id}>{follower.name}</Link>
            ))}
          </Stack>
        </TabPanel>
      </TabPanels>
    </Tabs>
    </>
  );
});