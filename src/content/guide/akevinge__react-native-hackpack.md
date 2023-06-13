---
author: HackUTD
description: A simple login example using React Native
pubDatetime: 2023-06-13T01:26:38.000Z
title: React Native Login
postSlug: react-native-hackpack
---

# Simple React Native Login Template

## Overview
In this tech guide, you'll be building a functional mobile login screen!

You'll be learning how to use the React Native and the [React Context API](https://legacy.reactjs.org/docs/context.html). To get started, you'll need basic knowledge of Typescript (or Javascript is fine).

![!](/assets/akevinge__react-native-hackpack/login-page-screenshot.png)

## Getting Started

Install/obtain the following if you haven't already:
- [Node v16 or higher](https://nodejs.org/en)
- A phone (Android or IOS)
- The [Expo Go App](https://expo.dev/client)

Download and unzip the code from this repository or from clicking [here](https://github.com/akevinge/react-native-hackpack/archive/refs/heads/main.zip).

Or if you'd like to use Git:
```bash
git clone https://github.com/akevinge/react-native-hackpack.git
# or
git clone git@github.com:akevinge/react-native-hackpack.git
```

Now in the project directory run the following:
```bash
# Install dependencies
npm i 
# Run app
npm start
```

Scan the QR code with your phone camera to see the live app!

## Actually Coding!!

First let's create the UI for our login screen. 

To break this down, there's 5 components to the UI: 
- the image
- the big "Login" text
- the text inputs
- the login button
- the external auth buttons

Then we'll get our feet wet with [React Context API](https://legacy.reactjs.org/docs/context.html) to add Login functionality.

We'll be knocking these out one at a time. 

### Setting Up the Screens

Create a file in the ``screens`` directory called ``LoginScreen.tsx``

Let's create a basic skeleton for the screen. 

A ``View`` is just a building block component that lets you define layouts. We'll be using this quite a bit so you might want to get familiar with it.

Let's give our ``View`` some styling. ``flex: 1`` tells the ``View`` to take up all the available space along its main axis (defaults to the vertical axis). ``gap: 24`` tells it to maintain 24units of space between all of its children.

Let's also give it two states, one for the email and one for the password. Take note as these will be used later!
```TSX
export const LoginScreen: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
    Hello World
    {/* Image */}
    {/* Login text */}
    {/* Inputs */}
    {/* Login Button */}
    {/* External auth buttons */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 24,
    paddingHorizontal: "12%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
```

To display our screen, import and add it to ``App.tsx``
```TSX
const App: FC = () => {
  return (
    <LoginScreen />
  );
};
```

### Adding The Image

Install the any imagine you want. I'm just going to use [Appreciation provided by unDraw](https://undraw.co/illustrations). Put the imagine in the ``assets`` folder.

Going back to ``screens/LoginScreen.tsx``. Let's import and use the ``Image`` component provided by React Native:
```TSX
export const LoginScreen: FC = () => {
    return (
        <View style={styles.container}>
            {/* Image */}
            <Image
                source={require("../assets/login-image.png")}
                style={{ width: "100%", height: "25%" }}
            />
            {/* Login text */}
            {/* Inputs */}
            {/* Login Button */}
            {/* External auth buttons */}
        </View>
    )
}
```

### Adding the Login Text

To do this, we just import and use the ``Text`` component provided by React Native:
```TSX
export const LoginScreen: FC = () => {
    return (
        <View style={styles.container}>
            {/* Image */}
            <Image
                source={require("../assets/login-image.png")}
                style={{ width: "100%", height: "25%" }}
            />
            {/* Login text */}
            <Text
                style={{ fontSize: 25, fontWeight: "600", alignSelf: "flex-start" }}
            >
                Login
            </Text>
            {/* Inputs */}
            {/* Login Button */}
            {/* External auth buttons */}
        </View>
    )
}
```

### Add the Inputs

This is where things get interesting. Let's start by creating the ``Input.tsx`` in the ``components`` folder (create one if there isn't already). React Native's default input component is ``TextInput``, but that's boring so we're going to add some stuff on top of it.

First thing we'll need to do is create the ``Input`` component:
```TSX
export interface InputProps extends TextInputProps {
  icon?: (focused: boolean) => ReactNode;
}

export const Input: FC<InputProps> = ({ style, icon, ...props }) => {
}
```

You'll notice that the ``icon`` prop is callback. That's because later we'll make the icon change color when the input is focused and unfocused. You'll also notice that it is optional. Sometimes our inputs don't have icons - this is just good practice for reusability.

Let's give ``Input`` that focused state:
```TSX
export const Input: FC<InputProps> = ({ style, icon, ...props }) => {
    const [isfocused, setFocused] = useState(false);
}
```

Now depending on whether an icon was provided, let's render the icon:
```TSX
export const Input: FC<InputProps> = ({ style, icon, ...props }) => {
    const [focused, setFocused] = useState(false);

    return icon ? (
        <View
            style={{
                flexDirection: "row",
                gap: 10,
                width: "100%",
            }}
        >
        {icon(focused)}
        {/* Actual input will go here */}
        </View>
    ) : (
        <InnerInput {...props} />
    );
}
```
Notice that ``View`` is styled with ``flexDirection: "row"``. This is because the React Native always tries to stack items in columns by default. This forces the icon to be on the same line as the input.

Now for the actual input, we'll make ``InnerInput``, a thin wrapper around the good'ol boring ``TextInput`` provided by React Native:
```TSX
export const Input: FC<InputProps> = ({ style, icon, ...props }) => {
    ...
}

const InnerInput: FC<TextInputProps & { focused?: boolean }> = ({
  focused,
  style,
  ...props
}) => (
  <TextInput
    style={[
      {
        borderBottomColor: focused ? "#000000" : "#e3e3e6",
        paddingBottom: 5,
        borderBottomWidth: StyleSheet.hairlineWidth,
      },
      style,
    ]}
    {...props}
  />
);
```

Let's add the ``InnerInput to our ``Input`` component.
```TSX
export const Input: FC<InputProps> = ({ style, icon, ...props }) => {
    const [focused, setFocused] = useState(false);

    return icon ? (
        <View
            style={{
                flexDirection: "row",
                gap: 10,
                width: "100%",
            }}
        >
            {icon(focused)}
            <InnerInput
                {...props}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                style={{ alignSelf: "center", flex: 1 }}
                focused={focused}
            />
        </View>
    ) : (
        <InnerInput {...props} />
    );
}
```

Finally, it's time to use our ``Input``! 

First we need to import the icons provided by ``Expo``. Add this to the top of ``LoginScreen.tsx``
```TSX
import EntypoIcon from "@expo/vector-icons/Entypo";
```

Now to tie everything together:
```TSX
export const LoginScreen: FC = () => {
    ...

    return (
        <View style={styles.container}>
            {/* Image */}
            {/* Login text */}
            {/* Inputs */}
            <Input
                onChangeText={setEmail}
                style={{ height: 60 }}
                placeholder="Email"
                autoCorrect={false}
                icon={(focused) => (
                <EntypoIcon
                    name="email"
                    color={focused ? "#000000" : "#bebec4"}
                    size={15}
                    style={{ marginTop: 2 }}
                />
                )}
            />
            <Input
                onChangeText={setPassword}
                style={{ height: 60 }}
                placeholder="Password"
                secureTextEntry
                icon={(focused) => (
                <EntypoIcon
                    name="lock"
                    color={focused ? "#000000" : "#bebec4"}
                    size={15}
                    style={{ marginTop: 2 }}
                />
                )}
            />
            {/* Login Button */}
            {/* External auth buttons */}
        </View>
    )
}
```

### Adding the Login Button

We're going to create a custom ``Button`` component, but first let's see how we want to call it. Won't worry about copying this. We'll add it later.
```TSX
export const LoginScreen: FC = () => {
    ...
  return (
    <View style={styles.container}>
        {/* Image */}
        {/* Login text */}
        {/* Inputs */}

        {/* Login Button */}
        <Button style={{ width: "100%" }} onPress={() => handleEmailLogin()}>
            Login
        </Button>

        {/* External auth buttons */}
        <Button
            style={{ width: "100%" }}
            color="secondary"
            >
            <Text>Google</Text>
        </Button>

    </View>
  );
};
```

In the ``components`` directory, let's create ``Button.tsx`` and create a skeleton component.

Our button will be a thin wrapper around React Native's ``Pressable`` component, which gives us fine-grained control over press interactions:
```TSX
export interface ButtonProps extends PressableProps {
    children?: ReactNode;
}

export const Button: FC<ButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <Pressable 
        {...props}
    >
        {children}
    </Pressable>
  );
};

```

Remember how we had two different buttons? One for the "Login" button and another for Google authentication? Notice how the style of these buttons were different. How can we give calling components of ``Button`` control over different styles while reusing the same component?

To do this, let's define our style classes:
```TSX

const pressableColorClasses = (pressed: boolean) =>
  StyleSheet.create({
    primary: {
      backgroundColor: pressed ? "#0260ed" : "#0165ff",
    },
    secondary: {
      backgroundColor: pressed ? "#e6eaeb" : "#f1f5f6",
    },
  });

const textColorClasses = StyleSheet.create({
  primary: {
    color: "#ffffff",
    fontWeight: "500",
  },
  secondary: {
    color: "#000000",
  },
});

export interface ButtonProps ...
export const Button ...
```

Notice how the button background colors change when being pressed. Notice how there are primary and secondary style classes. We'll now allow calling components to pass in ``"primary"`` or ``"secondary"`` depending on which style they need. The default style will be ``"primary"``.

```TSX
export interface ButtonProps extends PressableProps {
  color?: keyof ReturnType<typeof pressableColorClasses>;
  children?: ReactNode;
  style: StyleProp<ViewStyle>;
}

export const Button: FC<ButtonProps> = ({
  children,
  style,
  color = "primary",
  ...props
}) => {
    ...
}
```

Let's style the ``Pressable`` a bit, and add our dynamic background colors:
```TSX
export const Button: FC<ButtonProps> = ({
  children,
  style,
  color = "primary",
  ...props
}) => {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          paddingVertical: 12,
          borderRadius: 8,
          justifyContent: "center",
          flexDirection: "row",
          ...pressableColorClasses(pressed)[color],
        },
        style,
      ]}
      {...props}
    >
    {children}
    </Pressable>
  );
};
```

Lastly add the ``Text`` component inside the ``Pressable`` and style it:
```TSX
<Pressable
    style={({ pressed }) => [
    {
        paddingVertical: 12,
        borderRadius: 8,
        justifyContent: "center",
        flexDirection: "row",
        ...pressableColorClasses(pressed)[color],
    },
    style,
    ]}
    {...props}
>
    <Text
        style={{
            fontSize: 16,
            ...textColorClasses[color],
        }}
    >
        {children}
    </Text>
</Pressable>
```

Now we can actually use our ``Button``. Back in ``screens/LoginScreens.tsx`` add the following:
```TSX

export const LoginScreen: FC = () => {
    ...
  return (
    <View style={styles.container}>
        {/* Image */}
        {/* Login text */}
        {/* Inputs */}

        {/* Login Button */}
        <Button style={{ width: "100%" }} onPress={() => handleEmailLogin()}>
            Login
        </Button>

    {/* External auth buttons */}
    <Button
        style={{ width: "100%" }}
        color="secondary"
    >
        <View
            style={{
            flexDirection: "row",
            flexShrink: 1,
            gap: 10,
            alignItems: "center",
            }}
        >
            <Image
                source={require("../assets/google-logo.png")}
                style={{ width: 20, height: 20 }}
            />
            <Text>Google</Text>
        </View>
    </Button>
    </View>
  );
};
```

### Some Nice UI Touches

Let's add the Google logo to the login and a separator between the Login button and Google button.
```TSX
export const LoginScreen: FC = () => {
    ...
  return (
    <View style={styles.container}>
        {/* Image */}
        {/* Login text */}
        {/* Inputs */}

        {/* Login Button */}
        <Button style={{ width: "100%" }} onPress={() => handleEmailLogin()}>
            Login
        </Button>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ flex: 1, height: 1, backgroundColor: "#bebec4" }} />
            <View>
                <Text style={{ width: 50, color: "#bebec4", textAlign: "center" }}>
                    OR
                </Text>
            </View>
            <View style={{ flex: 1, height: 1, backgroundColor: "#bebec4" }} />
        </View>

        {/* External auth buttons */}
        <Button
            style={{ width: "100%" }}
            color="secondary"
        >
            <View
                style={{
                flexDirection: "row",
                flexShrink: 1,
                gap: 10,
                alignItems: "center",
                }}
            >
                <Image
                    source={require("../assets/google-logo.png")}
                    style={{ width: 20, height: 20 }}
                />
                <Text>Google</Text>
            </View>
        </Button>
    </View>
  );
};
```

## Adding Login Functionality