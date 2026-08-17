'use client'
import PasswordInputWithStrength from '@/components/PasswordInputWithStrength'
import Icon from '@/components/wrappers/Icon'
import { META_DATA } from '@/config/constants'
import { useState } from 'react'
import { Button, Form, FormCheck, FormControl, FormLabel } from 'react-bootstrap'

const Forms = () => {
  const [password, setPassword] = useState('')

  return (
    <Form>
      <div className="mb-3">
        <FormLabel>
          Name
          <span className="text-danger">&nbsp;*</span>
        </FormLabel>
        <div className="app-search">
          <FormControl type="text" id="userName" placeholder={META_DATA.username} required />
          <Icon icon="user" className="app-search-icon text-muted" />
        </div>
      </div>
      <div className="mb-3">
        <FormLabel>
          Email address
          <span className="text-danger">&nbsp;*</span>
        </FormLabel>

        <div className="app-search">
          <FormControl type="email" id="userEmail" placeholder="you@example.com" required />
          <Icon icon="mail" className="app-search-icon text-muted" />
        </div>
      </div>
      <div className="mb-3" data-password="bar">
        <PasswordInputWithStrength id="userPassword" label="Password" name="user-password" password={password} setPassword={setPassword} placeholder="••••••••" showIcon={true} />
      </div>
      <div className="mb-3">
        <FormCheck>
          <FormCheck.Input className="form-check-input-light fs-14" type="checkbox" defaultChecked id="termAndPolicy" />
          <FormCheck.Label>Agree the Terms &amp; Policy</FormCheck.Label>
        </FormCheck>
      </div>
      <div className="d-grid">
        <Button variant="primary" type="submit" className="fw-semibold py-2">
          Create Account
        </Button>
      </div>
    </Form>
  )
}

export default Forms
