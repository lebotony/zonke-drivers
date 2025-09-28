import React from "react";
import { View } from "react-native";

import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Fieldset } from "@/src/components/form/fieldset/input";

import { CreatePostSchema } from "../schema";

type FormValues = z.infer<typeof CreatePostSchema>;

const formDef = [
  {
    slug: "location",
    label: "Location",
    icon: "location-on",
    placeholder: "1327 Brooklyn Street, New York, USA",
  },
  {
    slug: "platforms",
    label: "Platforms",
    type: "dropdown",
    placeholder: "Select",
  },
  {
    slug: "licences",
    label: "Licences",
    type: "dropdown",
    placeholder: "Select",
  },
  {
    slug: "price",
    label: "Price",
    icon: "attach-money",
  },
  {
    slug: "age_range",
    label: "Age Range",
    icon: "event",
  },
];

export const Form = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(CreatePostSchema),
  });

  return (
    <View>
      <Fieldset
        control={control}
        name="post"
        label="Post"
        errors={errors}
        type="text"
        showMediaIcons
        placeholder="Add your caption here"
      />

      {formDef.slice(0, 3).map((item, idx) => (
        <Fieldset
          key={`${item.slug} - ${idx}`}
          label={item.label}
          name={item.slug as keyof FormValues}
          inputIcon={item.icon}
          control={control}
          placeholder={item.placeholder}
          errors={errors}
          {...(item.type === "dropdown" && { type: "dropdown" })}
          required
        />
      ))}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {formDef.slice(-2).map((item, idx) => (
          <Fieldset
            key={`${item.slug} - ${idx}`}
            label={item.label}
            name={item.slug as keyof FormValues}
            inputIcon={item.icon}
            control={control}
            placeholder={item.placeholder}
            errors={errors}
            {...(item.type === "dropdown" && { type: "dropdown" })}
            required
            customStyles={{ width: "47%" }}
          />
        ))}
      </View>
    </View>
  );
};
