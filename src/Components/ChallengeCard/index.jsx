/* eslint-disable */

import  {Card, Button} from "antd"


const ChallengeCard = (props) => {
    const {challenge, handleShowDetail } = props;
    return (<>
    <Card
                                style={{ width: "100%" , height:"100%",position:"relative"}}
                                hoverable
                                cover={
                                    <img
                                        alt="challenge"
                                        src={challenge.imageUrl ?? "https://png.pngtree.com/thumb_back/fw800/background/20230903/pngtree-a-puzzle-board-with-flags-set-up-image_13191520.jpg"}
                                        style={{ width: "100%", height: "100px", objectFit: "cover" }}
                                    />
                               }
                            >
                                <Card.Meta
                                    title={challenge.challengeName}
                                    description={`Level: ${challenge.level} - Point: ${challenge.point}`}
                                />
                                <Button style={{ marginTop: "20px" }} onClick={() => handleShowDetail(challenge)}>
                                    Thử thách
                                </Button>
                            </Card>
    </>)
}

export default ChallengeCard;