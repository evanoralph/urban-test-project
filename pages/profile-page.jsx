import * as React from "react";
import { Text, View } from "react-native";
import { Box, Button, ArrowBackIcon, ChevronLeftIcon, Pressable } from "native-base";
import { useEffect } from "react";
import styled from "styled-components/native";
import { SharedElement } from "react-navigation-shared-element";
import FastImage from "react-native-fast-image";
import { useNavigation } from "@react-navigation/native";

const ProfilePage = (props) => {
  const navigation = useNavigation();
  const { user, index } = props.route.params;


  useEffect(() => {
    const { user, index } = props.route.params;
  }, []);

  const handleBack = () => {
    navigation.navigate("Home");
  };

  return <Container>
    <SharedElement id={user.id} style={{ position: "absolute", width: "100%", height: "100%" }}>
      <FastImage
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 5,
        }}
        source={{
          uri: user.avatar,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
    </SharedElement>
    <ContainerInfo safeArea>
      <Box>
        <Pressable onPress={handleBack} width={50} height={50} >
          <ChevronLeftIcon size={8} color={'#fff'}/>
        </Pressable>
      </Box>
      <Box>
        <InfoText>
          Name: <InfoValue>{user.first_name} {user.last_name}</InfoValue>
        </InfoText>
        <InfoText>
          Username: <InfoValue>{user.username}</InfoValue>
        </InfoText>
        <InfoText>
          Email: <InfoValue>{user.email}</InfoValue>
        </InfoText>
        <InfoText>
          Gender: <InfoValue>{user.gender} </InfoValue>
        </InfoText>
      </Box>

    </ContainerInfo>
  </Container>;

};

export default ProfilePage;

const Container = styled.View`
  flex: 1;
  width: 100%;
`;

const InfoText = styled.Text`
  color: #f4ff00;
  font-size: 15px;
  font-weight: 700;
`

const InfoValue = styled.Text`
  color: #fff;
  font-size: 11px;
  font-weight: 700;
`

const ContainerInfo = styled(Box)`
  flex: 1;
  justify-content: space-between;
  z-index: 9999;
  padding-left: 10px;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
`;

const HeaderInfo = styled(Box)`
  justify-content: flex-start;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.2);
`;

const GoBack = styled(Button)`
  margin-top: 20px;
`;
