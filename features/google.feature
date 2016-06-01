
Feature: Searching for cucumbers
  As an internet user
  In order to find out more about cucumbers
  I want to be able to search for information about cucumbers
  
  @C
  Scenario: Google cucumber search
    When PC1 I search Google for "Wallingford Oxfordshire"
    Then PC1 I should see some results
    
  @F
  Scenario: Google cucumber search
    When M1 I search Google for "Somewhere Oxfordshire"
    Then M1 I should see some results