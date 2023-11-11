// import { Text } from "@nextui-org/react";

const CreateGameTitle = () => {

    return(
        <>
      <div
        className="text"
        size={60}
        weight="bold"
      >
        Let's
      </div>
      <div
        className="text"
        size={60}
        css={{
          textGradient: "45deg, $purple600 -20%, $pink600 100%",
        }}
        weight="bold"
      >
        Create Your Own
      </div>
      <div
        className="text"
        size={60}
        css={{
          textGradient: "45deg, $yellow600 -20%, $red600 100%",
        }}
        weight="bold"
      >
        Game!
      </div>
    </>
    );
}

export default CreateGameTitle;
