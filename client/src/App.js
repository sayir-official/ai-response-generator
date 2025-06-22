import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextareaAutosize,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  CircularProgress,
  IconButton,
  Snackbar,
  Tooltip
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import axios from 'axios';

function App() {
  const [input, setInput] = useState('');
  const [tone, setTone] = useState('friendly');
  const [lang, setLang] = useState('english');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setResponse('');

    try {
      const res = await axios.post('http://localhost:5000/api/generate', {

        message: input,
        tone,
        language: lang,
      });

      setResponse(res.data.output);
    } catch (err) {
      console.error(err);
      setResponse('❌ Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(response);
    setCopied(true);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        gap: 2,
        backgroundColor: '#f0f2f5',
      }}
    >
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        AI Response Generator
      </Typography>

      <Box sx={{ width: '100%', maxWidth: 600, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextareaAutosize
          aria-label="AI message input"
          placeholder="Enter your message here..."
          minRows={4}
          maxRows={10}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc',
            resize: 'vertical',
            overflow: 'auto',
          }}
        />

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <FormControl fullWidth>
            <InputLabel id="tone-label">Tone</InputLabel>
            <Select
              labelId="tone-label"
              value={tone}
              label="Tone"
              onChange={(e) => setTone(e.target.value)}
            >
              <MenuItem value="friendly">Friendly</MenuItem>
              <MenuItem value="funny">Funny</MenuItem>
              <MenuItem value="sarcastic">Sarcastic</MenuItem>
              <MenuItem value="professional">Professional</MenuItem>
              <MenuItem value="informative">Informative</MenuItem>
              <MenuItem value="motivational">Motivational</MenuItem>
              <MenuItem value="formal">Formal</MenuItem>
              <MenuItem value="direct">Direct</MenuItem>
              <MenuItem value="tough">Tough</MenuItem>
              <MenuItem value="empathetic">Empathetic</MenuItem>
              <MenuItem value="flirty">Flirty</MenuItem>
              <MenuItem value="playful">Playful</MenuItem>
              <MenuItem value="romantic">Romantic</MenuItem>
              <MenuItem value="sympathetic">Sympathetic</MenuItem>
              <MenuItem value="insult">Insult</MenuItem>
              <MenuItem value="roasting">Roasting</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="lang-label">Language</InputLabel>
            <Select
              labelId="lang-label"
              value={lang}
              label="Language"
              onChange={(e) => setLang(e.target.value)}
            >
              <MenuItem value="english">English</MenuItem>
              <MenuItem value="spanish">Spanish</MenuItem>
              <MenuItem value="hindi">Hindi</MenuItem>
              <MenuItem value="italian">Italian</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleSubmit}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
        >
          {loading ? 'Generating...' : 'Generate'}
        </Button>
      </Box>

      {response && (
        <Box
          sx={{
            mt: 4,
            p: 2,
            maxWidth: 600,
            backgroundColor: '#ffffff',
            border: '1px solid #ddd',
            boxShadow: '0 4px 12px rgba(41, 21, 223, 0.06)',
            borderRadius: '12px',
            
            textAlign: 'left',
            position: 'relative',
            width: '100%',
          }}
        >
          <Tooltip title="Copy to clipboard">
            <IconButton
              sx={{ position: 'absolute', top: 8, right: 10 }}
              onClick={handleCopy}
            >
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Typography sx={{ whiteSpace: 'pre-wrap' }}>{response}</Typography>
        </Box>
      )}

      <Snackbar
        open={copied}
        autoHideDuration={2000}
        onClose={() => setCopied(false)}
        message="Copied to clipboard ✅"
      />
    </Box>
  );
}

export default App;
