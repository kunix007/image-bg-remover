import { useState, useCallback, useRef } from 'react'
import { removeBackground } from '@imgly/background-removal'
import './App.css'

type ProcessStatus = 'idle' | 'loading-model' | 'processing' | 'done' | 'error'

function App() {
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [resultImage, setResultImage] = useState<string | null>(null)
  const [status, setStatus] = useState<ProcessStatus>('idle')
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [previewMode, setPreviewMode] = useState<'checkerboard' | 'white' | 'black'>('checkerboard')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = useCallback(async (file: File) => {
    // Validate file
    if (!file.type.match(/^image\/(jpeg|png|webp)$/)) {
      setError('请上传 JPG、PNG 或 WebP 格式的图片')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('图片大小不能超过 10MB')
      return
    }

    setError(null)
    setResultImage(null)
    setStatus('loading-model')
    setProgress(0)

    // Create preview URL
    const imageUrl = URL.createObjectURL(file)
    setOriginalImage(imageUrl)

    try {
      const resultBlob = await removeBackground(file, {
        progress: (key, current, total) => {
          if (key === 'compute:inference') {
            setStatus('processing')
            setProgress(Math.round((current / total) * 100))
          } else if (key === 'fetch:model') {
            setStatus('loading-model')
            setProgress(Math.round((current / total) * 100))
          }
        }
      })

      const resultUrl = URL.createObjectURL(resultBlob)
      setResultImage(resultUrl)
      setStatus('done')
    } catch (err) {
      console.error(err)
      setError(err instanceof Error ? err.message : '处理失败，请重试')
      setStatus('error')
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleFileSelect(file)
  }, [handleFileSelect])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
  }, [])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFileSelect(file)
  }, [handleFileSelect])

  const handleDownload = useCallback(() => {
    if (!resultImage) return
    const link = document.createElement('a')
    link.href = resultImage
    link.download = 'bg-removed.png'
    link.click()
  }, [resultImage])

  const handleReset = useCallback(() => {
    setOriginalImage(null)
    setResultImage(null)
    setStatus('idle')
    setProgress(0)
    setError(null)
  }, [])

  const getStatusText = () => {
    switch (status) {
      case 'loading-model':
        return `正在加载模型... ${progress}%`
      case 'processing':
        return `正在处理图片... ${progress}%`
      case 'error':
        return '处理失败'
      default:
        return ''
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🖼️ Image Background Remover</h1>
        <p>免费在线图片背景移除工具 · 图片在本地处理 · 隐私安全</p>
      </header>

      <main className="main">
        {status === 'idle' && !originalImage && (
          <div
            className="upload-area"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="upload-icon">📁</div>
            <p className="upload-text">拖拽图片到这里，或点击上传</p>
            <p className="upload-hint">支持 JPG、PNG、WebP，最大 10MB</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleInputChange}
              hidden
            />
          </div>
        )}

        {(status === 'loading-model' || status === 'processing') && (
          <div className="processing">
            <div className="spinner"></div>
            <p>{getStatusText()}</p>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="error-container">
            <p className="error-message">❌ {error}</p>
            <button className="btn btn-primary" onClick={handleReset}>
              重新上传
            </button>
          </div>
        )}

        {status === 'done' && originalImage && resultImage && (
          <div className="result-container">
            <div className="preview-toggle">
              <button
                className={`toggle-btn ${previewMode === 'checkerboard' ? 'active' : ''}`}
                onClick={() => setPreviewMode('checkerboard')}
              >
                透明背景
              </button>
              <button
                className={`toggle-btn ${previewMode === 'white' ? 'active' : ''}`}
                onClick={() => setPreviewMode('white')}
              >
                白色背景
              </button>
              <button
                className={`toggle-btn ${previewMode === 'black' ? 'active' : ''}`}
                onClick={() => setPreviewMode('black')}
              >
                黑色背景
              </button>
            </div>

            <div className="image-comparison">
              <div className="image-card">
                <h3>原图</h3>
                <img src={originalImage} alt="原图" />
              </div>
              <div className="image-card">
                <h3>去背景结果</h3>
                <div className={`result-preview bg-${previewMode}`}>
                  <img src={resultImage} alt="结果" />
                </div>
              </div>
            </div>

            <div className="actions">
              <button className="btn btn-primary" onClick={handleDownload}>
                ⬇️ 下载图片
              </button>
              <button className="btn btn-secondary" onClick={handleReset}>
                🔄 处理新图片
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>由 @imgly/background-removal 提供技术支持 · 完全免费</p>
      </footer>
    </div>
  )
}

export default App
