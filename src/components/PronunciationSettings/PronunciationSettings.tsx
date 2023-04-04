import { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Slider,
  Stack,
  TextField,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocalStorage, useSpeechSynthesis } from "hooks";
import { loadVoices } from "utils";
import { IVoiceSettings } from "interfaces";
import { DEFAULT_VOICE_SETTINGS, LsKeys } from "constants-local";
import { pronunciationSettingsSchema } from "yup/schemas";

interface IFormInput {
  voiceIndex: number;
  rate: number;
  pitch: number;
  text: string;
}

const getOptionLabel = (option: SpeechSynthesisVoice) =>
  `${option.name} (${option.lang})${option.default ? " — DEFAULT" : ""}`;

const PronunciationSettings = () => {
  const { speak } = useSpeechSynthesis();
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceSettingsLs, setVoiceSettingsLs] = useLocalStorage<IVoiceSettings>(
    LsKeys.VoiceSettings,
    DEFAULT_VOICE_SETTINGS
  );
  const [autocompleteInputValue, setAutocompleteInputValue] = useState("");
  const [autocompleteValue, setAutocompleteValue] = useState<SpeechSynthesisVoice | null>(null);
  const formElementsSize = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"))
    ? "medium"
    : "small";

  const {
    register,
    handleSubmit,
    control,
    getValues,
    watch,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      voiceIndex: voiceSettingsLs.voiceIndex,
      rate: voiceSettingsLs.rate,
      pitch: voiceSettingsLs.pitch,
      text: "",
    },
    mode: "onSubmit",
    resolver: yupResolver(pronunciationSettingsSchema),
  });
  const watchRate = watch("rate");
  const watchPitch = watch("pitch");

  const onSubmit = async (formData: IFormInput) => {
    speak(formData.text);
  };

  const updatePronunciationSettings = () => {
    const formValues = getValues();
    setVoiceSettingsLs({
      voiceIndex: formValues.voiceIndex,
      rate: formValues.rate,
      pitch: formValues.pitch,
    });
  };

  useEffect(() => {
    loadVoices().then(voices => {
      setVoices(voices);
      if (voiceSettingsLs.voiceIndex !== -1) {
        const voice = voices[voiceSettingsLs.voiceIndex];
        setAutocompleteInputValue(getOptionLabel(voice));
        setAutocompleteValue(voice);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      spacing={{ xs: 2, md: 3 }}
    >
      <Controller
        render={props => (
          <Autocomplete
            {...props}
            size={formElementsSize}
            disablePortal
            options={voices}
            getOptionLabel={getOptionLabel}
            renderInput={params => <TextField {...params} label="Voice" />}
            onChange={(_, data) => {
              const voiceIndex = voices.findIndex(voice => voice === data);
              props.field.onChange(voiceIndex);
              setAutocompleteValue(data);
              updatePronunciationSettings();
            }}
            value={autocompleteValue}
            inputValue={autocompleteInputValue}
            onInputChange={(_, newInputValue) => {
              setAutocompleteInputValue(newInputValue);
            }}
          />
        )}
        name="voiceIndex"
        control={control}
      />

      <Box>
        <Typography id="rate">
          Rate: <b>{watchRate}</b>
        </Typography>
        <Controller
          name="rate"
          control={control}
          render={props => (
            <Slider
              {...props}
              onChange={(_, value) => {
                props.field.onChange(value);
                updatePronunciationSettings();
              }}
              getAriaValueText={value => `${value}`}
              valueLabelDisplay="auto"
              min={0.1}
              max={2}
              step={0.1}
              aria-labelledby="rate"
              defaultValue={voiceSettingsLs.rate}
            />
          )}
        />
      </Box>

      <Box>
        <Typography id="pitch">
          Pitch: <b>{watchPitch}</b>
        </Typography>
        <Controller
          name="pitch"
          control={control}
          render={props => (
            <Slider
              {...props}
              onChange={(_, value) => {
                props.field.onChange(value);
                updatePronunciationSettings();
              }}
              getAriaValueText={value => `${value}`}
              valueLabelDisplay="auto"
              min={0}
              max={2}
              step={0.1}
              aria-labelledby="pitch"
              defaultValue={voiceSettingsLs.pitch}
            />
          )}
        />
      </Box>

      <TextField
        required
        fullWidth
        size={formElementsSize}
        label="Text"
        margin="normal"
        error={Boolean(errors.text)}
        helperText={errors.text?.message || ""}
        {...register("text")}
      />

      <Button variant="contained" type="submit" sx={{ alignSelf: "center" }}>
        Play
      </Button>
    </Stack>
  );
};

export { PronunciationSettings };
